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

let deleteInterview = async(id, interview) => {
    const options = {
        method: 'DELETE',
        body: JSON.stringify(interview),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviews/` + id + `.json`, options)
        const json = await response.json();
        console.log(json)
        alert("Interview has been deleted")
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let InterviewShow = {

    render: async() => {
        let request = Utils.parseRequestURL()
        let interview = await getInterview(request.id)

        return /*html*/ ` <section class = "section">
                    <p id="title"> Interview Title: ${interview.title} </p> 
                    <p id="interviewer_id"> Interviewer: ${interview.interviewer_id} </p> 
                    <p id="interviewee_id"> Interviewee: ${ interview.interviewee_id} </p> 
                    <p id="start_time"> Start Time: ${ interview.start_time} </p> 
                    <p id="end_time"> End Time: ${ interview.end_time} </p> 
                    <button class="button is-primary" id="edit_btn">
                    <a href="#/interview/edit/${interview.id}">Edit</a>
                    </button>
                    <button class="button is-primary" id="delete_btn">
                        <a href="#/interview">Delete</a>
                    </button>
                    </section>
                    `
    },
    after_render: async(id) => {
        await document.getElementById("delete_btn").addEventListener("click", () => {
            let title = document.getElementById("title");
            let interviewer_id = document.getElementById("interviewer_id").value;
            let interviewee_id = document.getElementById("interviewee_id").value;
            let start_time = document.getElementById("start_time").value;
            let end_time = document.getElementById("end_time").value;

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
            deleteInterview(id, data)
        })
    }
}


export default InterviewShow;