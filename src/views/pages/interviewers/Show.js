import Utils from '../../../services/Utils.js'

let getInterviewer = async(id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviewers/` + id + `.json`, options)
        const json = await response.json();
        console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let deleteInterviewer = async(id, interviewer) => {
    const options = {
        method: 'DELETE',
        body: JSON.stringify(interviewer),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviewers/` + id + `.json`, options)
        const json = await response.json();
        console.log(json)
        alert("Interviewer has been deleted")
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let InterviewerShow = {

    render: async() => {
        let request = Utils.parseRequestURL()
        let interviewer = await getInterviewer(request.id)

        return /*html*/ ` <section class = "section">
                    <p id="id"> Interviewer ID: ${interviewer.id} </p> 
                    <p id="email"> Email: ${interviewer.email} </p> 
                    <button class="button is-primary" id="edit_btn">
                    <a href="#/interviewer/edit/${interviewer.id}">Edit</a>
                    </button>
                    <button class="button is-primary" id="delete_btn">
                        <a href="#/interviewer">Delete</a>
                    </button>
                    </section>
                    `
    },
    after_render: async(id) => {
        await document.getElementById("delete_btn").addEventListener("click", () => {
            let id = document.getElementById("id");
            let email = document.getElementById("email").value;

            let data = {
                interviewer: {
                    id: id,
                    id: id,
                    email: email,
                    interviewee_id: interviewee_id,
                    start_time: start_time,
                    end_time: end_time
                }
            }
            console.log(data)
            deleteInterviewer(id, data)
        })
    }
}


export default InterviewerShow;