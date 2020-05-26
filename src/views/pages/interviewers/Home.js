// --------------------------------
//  Define Data Sources
// --------------------------------

let getInterviewersList = async() => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/interviewers.json`, options)
        const json = await response.json();
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Home = {
        render: async() => {
                let interviewers = await getInterviewersList()
                let view = /*html*/ `
        <section class="section">
            <h1> Home </h1>
            <ul>
                ${ interviewers.map(interviewer => 
                    /*html*/`<li><a href="#/interviewer/p/${interviewer.id}">${interviewer.email}</a></li>`
                    ).join('\n ')
                }
            </ul>
            <button>
                        <a href="#/interviewer/new">New</a>
                    </button>
        </section>
    `
        return view
    },
    after_render: async() => {}

}

export default Home;