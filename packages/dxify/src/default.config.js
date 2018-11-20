const readOnly = {
    hoverStateEnabled: false,
    focusStateEnabled: false,

    placeholder: "",
}

export default {
    TextBox: (props) => Object.assign({},
        props.readOnly && readOnly
    ),

    CheckBox: (props) => Object.assign({},
        props.readOnly && readOnly
    ),

    DateBox: (props) => Object.assign({}, {
        min: new Date(1900, 0, 1),
        max: new Date(2099, 11, 31),

    }, props.readOnly && readOnly),

    SelectBox: (props) => Object.assign({}, {
        valueChangeEvent: 'blur',
        searchEnabled: true,
    }, props._dataSource && {
        dataSource: new window.DevExpress.data.DataSource({
            store: props._dataSource,
            paginate: true,
            pageSize: 50,
        })
    }, props.readOnly && readOnly),

    Popover: (props) => Object.assign({}, {
        showEvent: 'dxhoverstart',
        hideEvent: 'dxhoverend',
    })
}