import { useState, useEffect , memo,Fragment} from 'react'

//react-bootstrap
import { Offcanvas, Row, Col} from 'react-bootstrap'

// Redux Selector / Action
import { useSelector } from 'react-redux';

// Import selectors & action from setting store
import * as SettingSelector from '../../store/setting/selectors'

// Section Components
// Style Setting Section Components
import ThemeScheme from './sections/theme-scheme'
import ColorCustomizer from './sections/color-customizer'
import MenuStyle from './sections/menu-style'
import MenuActiveStyle from './sections/menu-active-style'
import Direction from './sections/direction'


const SettingOffCanvas = memo((props) => {

    const [show, setShow] = useState(false);

    // Define selectors
    const themeScheme = useSelector(SettingSelector.theme_scheme)
    const themeSchemeDirection = useSelector(SettingSelector.theme_scheme_direction)
    const themeColor = useSelector(SettingSelector.theme_color)
    const sidebarType = useSelector(SettingSelector.sidebar_type)
    const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style)

    useEffect(() => {
        const onClick = (e) => {
            if(show) {
                if(e.target.closest('.live-customizer') == null && e.target.closest('#settingbutton') == null) {
                    setShow(false)
                }
            }
        };
        document.body.addEventListener("click", onClick);
    
        return () => {
            document.body.removeEventListener("click", onClick);
        };
    })
    return (
        <Fragment>
            {/* <div className="btn btn-fixed-end btn-danger btn-icon btn-setting" onClick={(e) => {e.stopPropagation();setShow(true)}} >
                <svg width="24" viewBox="0 0 24 24" className="animated-rotate" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.8064 7.62361L20.184 6.54352C19.6574 5.6296 18.4905 5.31432 17.5753 5.83872V5.83872C17.1397 6.09534 16.6198 6.16815 16.1305 6.04109C15.6411 5.91402 15.2224 5.59752 14.9666 5.16137C14.8021 4.88415 14.7137 4.56839 14.7103 4.24604V4.24604C14.7251 3.72922 14.5302 3.2284 14.1698 2.85767C13.8094 2.48694 13.3143 2.27786 12.7973 2.27808H11.5433C11.0367 2.27807 10.5511 2.47991 10.1938 2.83895C9.83644 3.19798 9.63693 3.68459 9.63937 4.19112V4.19112C9.62435 5.23693 8.77224 6.07681 7.72632 6.0767C7.40397 6.07336 7.08821 5.98494 6.81099 5.82041V5.82041C5.89582 5.29601 4.72887 5.61129 4.20229 6.52522L3.5341 7.62361C3.00817 8.53639 3.31916 9.70261 4.22975 10.2323V10.2323C4.82166 10.574 5.18629 11.2056 5.18629 11.8891C5.18629 12.5725 4.82166 13.2041 4.22975 13.5458V13.5458C3.32031 14.0719 3.00898 15.2353 3.5341 16.1454V16.1454L4.16568 17.2346C4.4124 17.6798 4.82636 18.0083 5.31595 18.1474C5.80554 18.2866 6.3304 18.2249 6.77438 17.976V17.976C7.21084 17.7213 7.73094 17.6516 8.2191 17.7822C8.70725 17.9128 9.12299 18.233 9.37392 18.6717C9.53845 18.9489 9.62686 19.2646 9.63021 19.587V19.587C9.63021 20.6435 10.4867 21.5 11.5433 21.5H12.7973C13.8502 21.5001 14.7053 20.6491 14.7103 19.5962V19.5962C14.7079 19.088 14.9086 18.6 15.2679 18.2407C15.6272 17.8814 16.1152 17.6807 16.6233 17.6831C16.9449 17.6917 17.2594 17.7798 17.5387 17.9394V17.9394C18.4515 18.4653 19.6177 18.1544 20.1474 17.2438V17.2438L20.8064 16.1454C21.0615 15.7075 21.1315 15.186 21.001 14.6964C20.8704 14.2067 20.55 13.7894 20.1108 13.5367V13.5367C19.6715 13.284 19.3511 12.8666 19.2206 12.3769C19.09 11.8873 19.16 11.3658 19.4151 10.928C19.581 10.6383 19.8211 10.3982 20.1108 10.2323V10.2323C21.0159 9.70289 21.3262 8.54349 20.8064 7.63277V7.63277V7.62361Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <circle cx="12.1747" cy="11.8891" r="2.63616" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                </svg>
            </div> */}

            <Offcanvas show={show} onHide={() => setShow(false)} placement={`${themeSchemeDirection === "rtl" ? 'start' : 'end'}`} backdrop={false} scroll={true} className="live-customizer">
                <Offcanvas.Header closeButton className="pb-0">
                    <div className="d-flex align-items-center">
                        <h4 className="offcanvas-title" id="live-customizer-label">Live Customizer</h4>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <div className="text-center">
                                    <h5 className="d-inline-block">Style Setting</h5>
                                </div>
                                <div>
                                    <ThemeScheme themeScheme={themeScheme}></ThemeScheme>
                                    {props.name === true ? '' : 
                                    <Fragment>
                                        <hr className="hr-horizontal" />
                                        <MenuStyle sidebarType={sidebarType}></MenuStyle>
                                        <hr className="hr-horizontal" />
                                        <MenuActiveStyle sidebarMenuStyle={sidebarMenuStyle}></MenuActiveStyle>
                                    </Fragment>
                                    }
                                    <hr className="hr-horizontal" />
                                    <ColorCustomizer themeColor={themeColor}></ColorCustomizer>
                                    <hr className="hr-horizontal" />
                                    <Direction themeSchemeDirection={themeSchemeDirection}></Direction>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </Fragment>
    )
})

SettingOffCanvas.displayName = 'SettingOffCanvas'
export default SettingOffCanvas
