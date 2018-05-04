import * as helper from "./helper"

const post = (url, data) => {
    return fetch(url, { method: "POST", body: JSON.stringify(data) })
    .then(r => {
        if (r.status >= 300) {
            throw new Error(`Server responded with ${r.status}`)
        }
        return r.json()
    })
    .catch(err => {
        throw err
    })
}

const del = (url) => {
    return fetch(url, { method: "DELETE" })
    .then(r => {
        if (r.status >= 300) {
            throw new Error(`Server responded with ${r.status}`)
        }
        return r.json()
    })
    .catch(err => {
        throw err
    })
}

export const saveBook = (book, id = null) => {
    let url = id === null ? helper.buildBookUrl() : helper.buildBookUrl() + id
    return post(url, book)
}

export const delBook = (id) => {
    return del(`${helper.buildBookUrl()}${id}`)
}

export const saveBranch = (branch, id = null) => {
    let url = id === null ? helper.buildBranchUrl() : helper.buildBranchUrl + id
    return post(url, branch)
}

export const delBranch = (id) => {
    return del((helper.buildBookUrl() + id))
}

export const saveInv = (inv, id = null) => {
    let url = id === null ? helper.buildInventoryUrl() : helper.buildInventoryUrl() + id
    return post(url, inv)
}

export const delInv = (id) => {
    return del(helper.buildInventoryUrl() + id)
}