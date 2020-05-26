import Utils from '../../../services/Utils.js'

let createInterview = async(interview) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(interview),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviews.json`, options)
        const json = await response.json();
        console.log("response", json)
        let notice = document.getElementById("notice");
        if (json.participant)
            notice.innerHTML = json.participant[0].message;
        else if (json.status)
            notice.innerHTML = json.status + json.error;
        else {
            notice.innerHTML = "Interview Created";
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
                            <label for="title">Title:</label>
                            <input class="input" id="title" type="text">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Interviewer id:</label>
                            <input class="input" id="interviewer_id" type="number">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Interviewee id:</label>
                            <input class="input" id="interviewee_id" type="number">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Start time:</label>
                            <input class="input" id="start_time" type="datetime-local">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">End time:</label>
                            <input class="input" id="end_time" type="datetime-local">
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
            let title = document.getElementById("title").value;
            let interviewer_id = document.getElementById("interviewer_id").value;
            let interviewee_id = document.getElementById("interviewee_id").value;
            let start_time = document.getElementById("start_time").value;
            let end_time = document.getElementById("end_time").value;
            if (end_time < start_time) {
                let notice = document.getElementById("notice");
                notice.innerHTML = "End time is before start time";
            }
            let data = {
                interview: {
                    id: id,
                    title: title,
                    interviewer_id: interviewer_id,
                    interviewee_id: interviewee_id,
                    start_time: start_time + ':00.000Z',
                    end_time: end_time + ':00.000Z'
                }
            }
            console.log(data)
            createInterview(data)
        })
    }
}

export default New;