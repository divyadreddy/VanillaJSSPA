import Utils from '../../../services/Utils.js'

let getInterview = async(id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviews/` + id + `.json`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let updateInterview = async(id, interview) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(interview),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviews/` + id + `.json`, options)
        const json = await response.json();
        console.log("response", json)
        let notice = document.getElementById("notice");
        if (json.participant)
            notice.innerHTML = json.participant[0].message;
        else {
            notice.innerHTML = "Interview Updated";
        }
        return json

    } catch (err) {
        console.log('Error getting documents', err)
    }
}


let Update = {
    render: async() => {
        let request = Utils.parseRequestURL()
        let interview = await getInterview(request.id)
        console.log(interview)
        return /*html*/ `
                <section class="section">
                <div class="field">
                        <p  id="notice">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Title:</label>
                            <input class="input" id="title" type="text" value="${interview.title}">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Interviewer id:</label>
                            <input class="input" id="interviewer_id" type="number" value="${interview.interviewer_id}">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Interviewee id:</label>
                            <input class="input" id="interviewee_id" type="number" value="${interview.interviewee_id}">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">Start time:</label>
                            <input class="input" id="start_time" type="datetime-local" value="${interview.start_time.substring(0, interview.start_time.length - 2)}">
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <label for="title">End time:</label>
                            <input class="input" id="end_time" type="datetime-local" value="${interview.end_time.substring(0, interview.end_time.length - 2)}">
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
                    start_time: start_time,
                    end_time: end_time
                }
            }
            console.log(data)
            updateInterview(id, data)
        })
    }
}

export default Update;