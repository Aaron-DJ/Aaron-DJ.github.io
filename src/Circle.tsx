const Circle = ({size, color}: any) => {
    const styles = {
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
    };

    return <div style={styles}></div>;
};

export default Circle;