const Utils = {
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL: () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            entity: null,
            resource: null,
            id: null,
            verb: null
        }
        request.entity = r[1]
        request.resource = r[2]
        request.id = r[3]
        request.verb = r[4]

        return request
    },
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Utils;