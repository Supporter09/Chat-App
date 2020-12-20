export default function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Làm mịn dữ liệu cho một document
export function getDataFromDoc(doc, excepts =[]) {
    let data = doc.data();
    data.id = doc.id;
    return data;
}

export function getDataFromDocs(docs,excepts=[]){
    return docs.map(function(doc) {
        return getDataFromDoc(doc, excepts)
    })
}