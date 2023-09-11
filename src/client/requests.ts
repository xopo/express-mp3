const {BASE_URL} = import.meta.env;

const post = async (url: string, data?: any) => {
    const result = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    })
    return await result.json();
}

export async function downloadApi(url: string, format: string, folder='/') {
    return post(`${BASE_URL}api/download`, {url, format, folder});
    // const result = await fetch(`${BASE_URL}api/download`, {
    //     method: "POST",
    //     credentials: "same-origin",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     referrerPolicy: "no-referrer",
    //     body: JSON.stringify({url, format, folder}),
    // })
    // return await result.json();
}

export async function apiGetWaiting() {
    return await (await fetch(`${BASE_URL}api/getWaiting`, {cache: "no-cache"})).json();
}

export async function apiUpdate() {
    return await (await fetch(`${BASE_URL}api/update`, {cache: "no-cache"})).json();
}

export async function apiGetContent(folderName: string) {
    return post(`${BASE_URL}api/content`, {folder: folderName})
    // const url = `${BASE_URL}api/content?folder=${folderName}`;
    // const result = await fetch(url)
    // return await result.json();
}

export async function checkDownloadStatus(id: string, folder: string) {
    const url = `${BASE_URL}api/downloadStatus`;
    return post(url, {id, folder});
    // const result = await fetch(url, {
    //     method: "POST",
    //     credentials: "same-origin",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     referrerPolicy: "no-referrer",
    //     body: JSON.stringify({id, folder}),
    // })
    // return await result.json();
}

export async function apiGetFolders(id: string) {
    const url =  `${BASE_URL}api/getFolders?id=${id}`;
    const result = await fetch(url);
    return await result.json();
}

export async function apiSetFolders(id: string, selection: string[]) {
    const url = `${BASE_URL}api/getFolders`;
    return post(url, {id, selection});
    // const result = await fetch(url, {
    //     method: "POST",
    //     credentials: "same-origin",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     referrerPolicy: "no-referrer",
    //     body: JSON.stringify({id, selection}),
    // })
    // return await result.json();
}

export async function apiAddFolder(name: string) {
    const url = `${BASE_URL}api/addFolder`;
    return post(url, {name});
    // const result = await fetch(url, {
    //     method: "POST",
    //     credentials: "same-origin",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     referrerPolicy: "no-referrer",
    //     body: JSON.stringify({name})
    // })
    // return await result.json();
}