import * as helper from "./helper"

const get = (url) => {
    return fetch(url)
    .then(r => r.json())
    .catch(err => { console.log(err) })
}

export const getBook = (id) => {
    let url = `${helper.buildBookUrl()}${id}`
    return get(url)
}

export const getBooks = () => {
    return get(helper.buildBookUrl())
}

export const getBranch = (id) => {
    let url = `${helper.buildBranchUrl()}${id}`
    return get(url)
}

export const getBranches = () => {
    return get(helper.buildBranchUrl())
}

export const getInv = (id) => {
    let url = `${helper.buildInventoryUrl()}${id}`
    return get(url)
}

export const getInvs = () => {
    return get(helper.buildInventoryUrl())
}