import React, {useState} from 'react';
import {Mutation} from 'react-apollo';
import Toggle from 'react-toggle';
import toggleCool from '../mutations/toggleCool';
import currentUser from '../queries/current_user';

/**
 * Expected props
 * cool, Boolean
 */
const CoolToggle = (props) => {
   
    const [on, toggle] = useState(props.cool)
    return (
        <div className="cool-switch">
           <Mutation
                mutation={toggleCool}
                refetchQueries={[{ query: currentUser }]}
            >
                {(toggleCool, loading) => 
                !loading ? (
                    <div>Loading</div>
                ) : (
                <label className="cool-toggle" htmlFor='cool-state'> 
                    <span>Cool Mode</span>
                    <Toggle
                        id="cool-state"
                        defaultChecked={on}
                        icons={false}
                        onChange={
                            event => {
                                event.preventDefault();
                                toggleCool({
                                    variables: {
                                        id: props.id
                                    }
                                }).then(res => {
                                    const cool = res.data.toggleCool.cool;
                                    toggle(cool)
                                }).catch(res => {
                                })
                            }
                        }
                    />
                </label>

                 )}
            </Mutation>
        </div>
    )

}

export default CoolToggle;

/**
 *   <Mutation
                mutation={toggleCool}
                refetchQueries={[{ query: currentUser }]}
            >
                {(toggleCool, loading) => 
                !loading ? (
                    <div>Loading</div>
                ) : (
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
                 )}
            </Mutation>
            <label htmlFor='cool-state'>Adjacent label tag</label>

 */