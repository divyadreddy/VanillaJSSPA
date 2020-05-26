import Utils from '../../../services/Utils.js'

let createInterviewer = async(interviewer) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(interviewer),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviewees.json`, options)
        const json = await response.json();
        console.log("response", json)
        let notice = document.getElementById("notice");
        if (json.participant)
            notice.innerHTML = json.participant[0].message;
        else if (json.status)
            notice.innerHTML = json.status + json.error;
        else {
            notice.innerHTML = "Interviewer Created";
        }
        return json

    } catch (err) {
        console.log('Error getting documents', err)
    }
}


let New = {
    render: async() => {
        return /*html*/ `
                <section class="section">
                <div class="field">
                        <p  id="notice">
                        </p>
                    </div>
                    
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="id">Interviewerer id:</label>
                            <input class="input" id="email" type="text">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button class="button is-primary" id="create_btn">
                            Create
                            </button>
                        </p>
                    </div>

            </section>
        `
    },

    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted

    after_render: async(id) => {
        await document.getElementById("create_btn").addEventListener("click", () => {
            let email = document.getElementById("email").value;
            let data = {
                interviewer: {
                    email: email,
                }
            }
            console.log(data)
            createInterviewer(data)
        })
    }
}

export default New;