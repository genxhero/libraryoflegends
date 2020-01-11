import React, {useState} from 'react';
import {Mutation} from 'react-apollo';
import Toggle from 'react-toggle'
import toggleCool from '../mutations/toggleCool';
import currentUser from '../queries/current_user';

/**
 * Expected props
 * cool, Boolean
 */
const CoolToggle = (props) => {
    debugger;
    const [on, toggle] = useState(props.cool)
    return (
        <div className="cool-switch">
            <Mutation
                mutation={toggleCool}
                refetchQueries={[{ query: currentUser }]}
            >
                <Toggle
                    id="cool-state"
                    defaultChecked={on}
                    onChange={
                        event => {
                            event.preventDefault();
                            toggleCool({
                                variables: {
                                    id: this.props.id
                                }
                            }).then(res => {
                                debugger;
                                toggle(res.cool)
                            })
                        }
                    }
                 />

                <label htmlFor='cool-state'>Adjacent label tag</label>
            </Mutation>
        </div>
    )

}

export default CoolToggle;