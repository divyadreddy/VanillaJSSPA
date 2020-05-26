import Utils from '../../../services/Utils.js'

let getInterviewer = async(id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviewees/` + id + `.json`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let updateInterviewer = async(id, interviewer) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(interviewer),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviewees/` + id + `.json`, options)
        const json = await response.json();
        console.log("response", json)
        let notice = document.getElementById("notice");
        notice.innerHTML = "Interviewer Updated";
        return json

    } catch (err) {
        console.log('Error getting documents', err)
    }
}


let Update = {
    render: async() => {
        let request = Utils.parseRequestURL()
        let interviewer = await getInterviewer(request.id)
        console.log(interviewer)
        return /*html*/ `
                <section class="section">
                <div class="field">
                        <p  id="notice">
                        </p>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="email">Interviewerer email:</label>
                            <input class="input" id="email" type="text" value="${interviewer.email}">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button class="button is-primary" id="edit_btn">
                            Edit
                            </button>
                        </p>
                    </div>

            </section>
        `
    },

    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted

    after_render: async(id) => {
        await document.getElementById("edit_btn").addEventListener("click", () => {
            let email = document.getElementById("email").value;

            let data = {
                interviewer: {
                    id: id,
                    email: email,
                }
            }
            console.log(data)
            updateInterviewer(id, data)
        })
    }
}

export default Update;