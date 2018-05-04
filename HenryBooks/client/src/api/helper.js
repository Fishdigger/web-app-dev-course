import * as config from "../config"

export const buildBranchUrl = () => {
    return `${config.serverUrl}/branches/`
}

export const buildBookUrl = () => {
    return `${config.serverUrl}/books/`
}

export const buildInventoryUrl = () => {
    return `${config.serverUrl}/inventories/`
}