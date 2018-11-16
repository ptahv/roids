import React from 'react';

import {
    InfiniteLoader, 
    CellMeasurerCache, 
    AutoSizer, 
    Table, 
    Column, 
    CellMeasurer } from 'react-virtualized'

import core from './VTable.core.js';
import './VTable.css';

/* Custom column props:
    - useDynamicHeight, bool, enables cell dynamic height
    - useDynamicWidth, bool, enables cell dynamic width
    - sortFormat, function, used as sort formatter
*/

const WithInfiniteLoader = ({children, ...infiniteLoaderProps}) => {
    if (!infiniteLoaderProps.loadMoreRows)
        return children({});

    return (
        <InfiniteLoader {...infiniteLoaderProps} >
            {children}
        </InfiniteLoader>
    )
}

export default class VTable extends React.Component {
    cache = null;

    state = {
        sortBy: null,
        sortDirection: null
    }

    constructor({columns}) {
        super();

        const dynamicHeightCol = columns.find(c => c.useDynamicHeight);
        const dynamicWidthCol = columns.find(c => c.useDynamicWidth || !c.width);

        if (dynamicHeightCol || dynamicWidthCol) {
            this.cache = new CellMeasurerCache({
                defaultHeight: core.rowHeight,
                fixedHeight: !dynamicHeightCol,
                fixedWidth: !dynamicWidthCol 
            })
        }
    }

    componentDidUpdate(nextProps) {
        if (!nextProps.items || !nextProps.items.length)
            this.cache = null;

        if (this.table)
            this.table.measureAllRows()
    }

    sortItems(items, sortBy, sortDirection) {
        if (!sortBy)
            return items;

        const sortFormat = this.props.columns
            .find(c => c.dataKey === sortBy)
            .sortFormat 
            || function(v) { return v; }

        const sortedList = items.sort((a, b) => {
            const cmpOne = sortFormat({item: a[sortBy]});
            const cmpTwo = sortFormat({item: b[sortBy]});

            if (cmpOne > cmpTwo) 
                return -1;

            else if (cmpOne < cmpTwo) 
                return 1;
            
            return 0;
        })

        return sortDirection === 'DESC'
            ? sortedList.reverse()
            : sortedList
    }

    render() {
        const {
            items,
            columns,

            width,
            height,

            loadMoreRows,
            onRowClick,

            ...tableProps
        } = this.props;

        if (!items.length)
            return null;

        const {
            sortBy,
            sortDirection 
        } = this.state;

        const itemCount = items.length;
        const tableItems = this.sortItems(items, sortBy, sortDirection);
        const dynamicRowHeight = columns.find(({dynamicHeight}) => dynamicHeight);

        return (
            <WithInfiniteLoader
                rowCount={itemCount}
                isRowLoaded={({index}) => index !== itemCount - 1}
                loadMoreRows={loadMoreRows}
                >
                {({onRowsRendered, registerChild}) => (
                <AutoSizer>
                    {({width: _width, height: _height}) => (
                        <Table
                            ref={table => {
                                this.table = table;
                                
                                if(registerChild)
                                    registerChild(table);
                            }}

                            rowCount={itemCount}
                            rowHeight={core.rowHeight}
                            rowGetter={({index}) => tableItems[index]}
                            rowClassName={({index}) => (
                                !onRowClick
                                    ? core.rowClassName
                                    : core.clickableRowClassName
                                ) + index%2}

                            headerHeight={core.headerHeight}
                            headerClassName={core.headerClassName}

                            sortBy={sortBy}
                            sortDirection={sortDirection}
                            sort={({sortBy, sortDirection}) => this.setState({sortBy, sortDirection})}

                            width={width || _width}
                            height={height || _height}

                            {...Object.assign({},
                                tableProps,

                                onRowClick && {
                                    onRowClick
                                },

                                onRowsRendered && {
                                    onRowsRendered 
                                },

                                this.cache && { 
                                    deferredMeasurementCache: this.cache 
                                },

                                dynamicRowHeight && {
                                    rowHeight: this.cache.rowHeight 
                                }
                            )}>
                            {columns.map(({hidden, useDynamicHeight, useDynamicWidth, cellRenderer, ...columnProps}, index) => {

                                if (hidden)
                                    return null;

                                const dynamicWidth = useDynamicWidth || !columnProps.width;

                                return (
                                    <Column
                                        key={index}
                                        className={core.cellClassName}
                                        {...Object.assign({}, 
                                            columnProps,

                                            cellRenderer && {
                                                cellRenderer: (args) => cellRenderer(
                                                    Object.assign({}, args, {
                                                        item: args.rowData[args.dataKey]
                                                    }))
                                            },

                                            dynamicWidth && {
                                                width: this.cache.columnWidth(index)
                                            },

                                            (useDynamicHeight || dynamicWidth) && {
                                                cellRenderer: (args) => {
                                                    const {dataKey, parent, rowIndex} = args;

                                                    return (
                                                        <CellMeasurer
                                                            cache={this.cache}
                                                            dataKey={dataKey}
                                                            parent={parent}
                                                            rowIndex={rowIndex}
                                                            columnIndex={0}>
                                                            {!cellRenderer
                                                                ? <div className={core.cellClassName}> {args.cellData} </div>
                                                                : cellRenderer(Object.assign({}, args, {
                                                                    item: args.rowData[args.dataKey]
                                                                }))
                                                            }
                                                        </CellMeasurer>
                                                    )
                                                }
                                            }
                                        )}/>
                            )})}
                        </Table>
                    )}
                </AutoSizer>
                )}
            </WithInfiniteLoader>
        )
    }
}