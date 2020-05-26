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
        const response = await fetch(`http://localhost:3000/interviewees.json`, options)
        const json = await response.json();
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Home = {
        render: async() => {
                let interviewees = await getInterviewersList()
                let view = /*html*/ `
        <section class="section">
            <h1> Home </h1>
            <ul>
                ${ interviewees.map(interviewer => 
                    /*html*/`<li><a href="#/interviewee/p/${interviewer.id}">${interviewer.email}</a></li>`
                    ).join('\n ')
                }
            </ul>
            <button>
                        <a href="#/interviewee/new">New</a>
                    </button>
        </section>
    `
        return view
    },
    after_render: async() => {}

}

export default Home;