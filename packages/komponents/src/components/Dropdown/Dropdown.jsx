import React from 'react';

export default class extends React.Component {
    preventClose = false;

    componentDidMount() {
        // If required, onBlur ja onFocus events can be used for keyboard actions.
        //
        window.addEventListener(
            "komponents_dropdown_click",
            this.closeDropdown,
            true
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "komponents_dropdown_click",
            this.closeDropdown,
            true
        );
    }

    closeDropdown = () => {
        if (!this.preventClose && this.props.onClose)
            setTimeout(this.props.onClose);

        this.preventClose = false;
    }

    render() {
        const {
            style = {},
            className = '',

            visibleAfterClick = false,
        } = this.props;

        return (
            <React.Fragment>
                <div 
                    style={style}
                    className={
                        'position-absolute bg-white shadow-sm '
                        + styles.zindex + ' '
                        + className
                    }
                    onMouseDown={visibleAfterClick ? () => { this.preventClose = true } : null}
                    >
                    {this.props.children}

                </div>

                {modal && (
                    <AppendToBody>
                        <div className='esc esc-dropdown-modalBackground' />
                    </AppendToBody>
                )}
            </React.Fragment>
        )
    }
}

// export default class extends React.Component {
//     preventClose = false;

//     componentDidMount() {
//         // onBlur ja onFocus eventeillä voidaan hoitaa näppäimistön toiminta
//         //
//         window.addEventListener(
//             "click",
//             this.closeDropdown,
//             true
//         );
//     }

//     componentWillUnmount() {
//         window.removeEventListener(
//             "click",
//             this.closeDropdown,
//             true
//         );
//     }

//     closeDropdown = () => {
//         if (this.props.onClose && !this.preventClose)
//             setTimeout(this.props.onClose);

//         this.preventClose = false;
//     }

//     preventCloseOnClick = () => {
//         this.preventClose = true;
//     }
    
//     render() {
//         const {
//             style = {},
//             className = '',

//             modal = false,
//             keepOpenOnClick = false,


//             // Tarvittaessa voidaan lisätä modalStyle ja modalClassName

//             onClose = null
//         } = this.props;

//         return (
//             <React.Fragment>
//                 <div 
//                     style={style}
//                     className={'esc esc-dropdown-container ' + className}
//                     onMouseDown={keepOpenOnClick ? this.preventCloseOnClick : null}
//                     >
//                     {this.props.children}

//                 </div>

//                 {modal && (
//                     <AppendToBody>
//                         <div className='esc esc-dropdown-modalBackground' />
//                     </AppendToBody>
//                 )}
//             </React.Fragment>
//         )
//     }
// }