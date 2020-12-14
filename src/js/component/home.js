import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { array } from "prop-types";

//create your first component
export function Home() {
	const [deleteState, setDeleteState] = useState();
	const [deleteIndex, setDeleteIndex] = useState("delete-none");
	const [list, setList] = useState([
		{ label: "Walk the dog", done: false },
		{ label: "Walk the dog", done: false }
	]);

	const [todo, setTodo] = useState("");

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			// console.log("I'm working");
			// e.preventDefault();
			// list.push({ label: todo, done: false });
			// setTodo("");
			setList(list.concat({ label: todo, done: false }));
			setTodo("");
		}
	};
	const deleteTodo = index => {
		let newList = list.filter((item, i) => {
			return i !== index;
		});
		setList(newList);
	};

	const handleCompleteTodo = index => {
		let newList = [].concat(list);
		newList[index].done = !newList[index].done;
		setList(newList);
	};

	return (
		<div className="text-center d-flex flex-column align-items-center justify-content-center">
			<h1>To Do List</h1>
			<form className="" onSubmit={e => e.preventDefault()}>
				<ul className="list-unstyled list-group">
					<li>
						{" "}
						<input
							className="form-control"
							type="text"
							placeholder="What has to be done?"
							aria-label="add to do"
							value={todo}
							onChange={e => setTodo(e.target.value)}
							onKeyPress={e => handleKeyPress(e)}
						/>
					</li>
					{list.map((item, index) => {
						return (
							<li
								onMouseOver={() => {
									setDeleteIndex(index);
									setDeleteState(
										deleteIndex === index
											? "delete-none"
											: "delete-visible"
									);
								}}
								onMouseOut={() => {
									setDeleteState("delete-none");
								}}
								className="list-group-item d-flex justify-content-between align-items-center "
								key={index}>
								<div
									className={
										item.done
											? "status border  rounded-circle d-inline-block done"
											: "status border  rounded-circle d-inline-block"
									}
									onClick={() => handleCompleteTodo(index)}>
									{" "}
								</div>
								{item.label}{" "}
								<span
									className={`delete float-right ${deleteIndex ===
										index && deleteState}`}
									onClick={() => deleteTodo(index)}>
									<FontAwesomeIcon icon={faTimes} />
								</span>
							</li>
						);
					})}
					<li className="items">
						{list.length} item
						{list.length > 1 || list.length === 0 ? "s" : null} left
					</li>
				</ul>
			</form>
		</div>
	);
}
