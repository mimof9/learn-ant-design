import myStyles from './styles.less'

export default () => {
    return (
        <div className={myStyles.hello}>
            <span className={myStyles.deleted}>Hello World</span>
        </div>
    )
}
