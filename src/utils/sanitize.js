// ~/utils/sanitize.js
export const sanitize = (obj = {}) =>
    Object.fromEntries(
        Object.entries(obj).filter(
            ([_, v]) =>
                v !== undefined &&
                v !== null &&
                !(typeof v === 'string' && v.trim() === '')
        )
    )

export const pick = (obj = {}, keys = []) => {
    const out = {}
    for (const k of keys)
        if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k]
    return out
}
