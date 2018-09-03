import React, { Component } from 'react';

class About extends Component {
    
    render() {
        return (
            <div className="box-wrap">
            <div className="box-html">
                <p><b>An Open Library</b><br/><hr/>
                                        <b>Vision</b><br/>
                        To provide a simple window for the management of books.

                                        <b>Mission</b><br/>
                        Hello-Books provides a free and equitable access to library services which meet
                    the current standards of accessibility, security, and availability.
                    By this, it will encourage Libraries to adopt international standards of library
                    management. These will push forward the base need of Libraries to preserves and promote
                    access to a broad range of human knowledge, experience, information and ideas 
                    in a safe, accessible and secure environment.

                                        <b>Values</b>
                    <i>Equity: Accessibility, respect and fairness
                    Diversity: Valuing individual needs, experiences and differences
                    Intellectual Freedom: Guaranteeing and facilitating the free exchange of 
                    information and ideas in a democratic society, protecting intellectual freedom
                    and respecting individuals' rights to privacy and choice
                    Innovation: Encouraging creativity, experimentation and the generation of ideas
                    Inclusion: Welcoming participation in decision making and service development by
                    residents and communities
                    Integrity: Open, transparent and honest in all our dealings
                    Accountability: Taking responsibility for our actions and the services we provide
                    Service Orientation: Providing excellent, responsive services</i> Values 
                    expressed by the<a href="https://www.torontopubliclibrary.ca/about-the-library/mission-vision-values/">
                    Toronto Public Library</a>. 

                </p>
                </div>
            </div>)
    }
}

export default About;