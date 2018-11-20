import React from 'react';

import { InfiniteLoader, AutoSizer, List } from 'react-virtualized';

const WithInfiniteLoader = ({children, ...infiniteLoaderProps}) => {
    if (!infiniteLoaderProps.loadMoreRows)
        return children({});

    return (
        <InfiniteLoader {...infiniteLoaderProps} >
            {children}
        </InfiniteLoader>
    )
}

export default class extends React.Component {
    heightsCache = {};

    componentDidUpdate(nextProps) {
        if (!nextProps.items || !nextProps.items.length)
            this.heightsCache = {};

        if (this.list)
            this.list.measureAllRows()
    } 

    render() {
        const {
            items,

            rowHeight,
            loadMoreRows,
            ...listProps
        } = this.props;

        if (!items || !items.length)
            return null;
            
        const itemCount = items.length;

        return (
            <WithInfiniteLoader
                rowCount={itemCount}
                isRowLoaded={({index}) => index !== itemCount - 1}
                loadMoreRows={loadMoreRows}
                >
                {({onRowsRendered, registerChild}) => (
                    <AutoSizer> 
                        {({width, height}) => (
                            <List   
                                // InfiniteLoader
                                //
                                ref={list => {
                                    this.list = list

                                    if (registerChild)
                                        registerChild(list);
                                }}
                
                                // AutoSizer
                                //
                                width={width}
                                height={height}
                
                                // List
                                //
                                containerStyle={{overflow:'initial'}}
                                
                                rowCount={itemCount}

                                rowHeight={typeof rowHeight === 'function'
                                    ? (...args) => {
                                        const {index} = args[0];

                                        if (this.heightsCache[index] == undefined)
                                            this.heightsCache[index] = rowHeight(...args);
                                        
                                        return this.heightsCache[index];
                                    } : rowHeight }

                                {...Object.assign({}, listProps, onRowsRendered && {
                                    onRowsRendered
                                })}
                                />
                        )}
                    </AutoSizer>
                )}
            </WithInfiniteLoader>
        )
    }
}