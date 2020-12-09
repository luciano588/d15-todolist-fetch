import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { array } from "prop-types";

//create your first component
export function Home() {
	const [list, setList] = useState([
		{ label: "Walk the dog", done: false },
		{ label: "Walk the dog", done: false }
	]);

    const [todo, setTodo] = useState("");
    
    

	const handleKeyPress = e => {
		// e.preventDefault();
		// let aux = list;
		if (e.key === "Enter") {
			// aux.push(todo)
			// setList(aux) //secundary method
            setList(list.concat([{ label: todo, done: false }]  ));
            setTodo("");
		}
	};
	return (
		<div className="text-center d-flex flex-column align-items-center justify-content-center">
			<h1>To Do List</h1>
			<form className="">
				<ul className="list-unstyled">
					<li>
						{" "}
						<input
							className="form-control"
							type="text"
							placeholder="What has to be done?"
                            onChange={e => setTodo(e.target.value)}
                            onKeyPress
						/>
					</li>
					{list.map((item, index) => {
						return (
							<li key={index}>
								{" "}
								{item.label}{" "}
								<span>
									<FontAwesomeIcon icon={faTimes} />{" "}
								</span>
							</li>
						);
					})}
					<li>
						{list.length} item
						{list.length > 1 || list.length === 0 ? "s" : null} left
					</li>
				</ul>
			</form>
		</div>
	);
}
