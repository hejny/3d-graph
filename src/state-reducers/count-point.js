const defaultCountPoint = `(t, u, v)=>{
    const u1 = u - 10;
    const v1 = v - 10;

    const u2 = u + 10;
    const v2 = v + 10;

    const distance1 = Math.sqrt(u1 * u1 + v1 * v1);

    const m = 1.5;
    const top = (Math.cos(v * 3 + t * 3) + Math.cos(u * 5 + t * 7) + 1) / 10 + 1;

    return ([
        -10 * top * Math.cos(u) * (m + Math.cos(v))
        ,
        -10 * top * Math.sin(v)
        ,
        -10 * top * Math.sin(u) * (m + Math.cos(v))
    ]);
}`;




export default function countPoint(countPoint = defaultCountPoint, action) {
    switch (action.type) {

        case 'COUNT_POINT_CHANGE':
            return action.code;

        default:
            return countPoint;
    }
}