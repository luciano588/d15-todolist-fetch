import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { array } from "prop-types";

//create your first component
export function Home() {
	const urlApi = "https://assets.breatheco.de/apis/fake/todos/user/luc588";
	const [todolist, setTodoList] = useState([]);
	useEffect(() => {
		syncList();
	}, []);

	const syncList = () => {
		return fetch(urlApi)
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				setList(data);
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};
	const updateTodos = list => {
		return fetch(urlApi, {
			method: "PUT",
			body: JSON.stringify(list),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) throw new Error(resp.statusText);
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(() => {
				syncList();
			})
			.catch(error => {
				//error handling
				console.error(error);
			});
	};

	const [deleteIndex, setDeleteIndex] = useState();
	const [list, setList] = useState([]);

	const [todo, setTodo] = useState("");

	const handleKeyPress = e => {
		if (e.key === "Enter") {
			let newList = list.concat([
				{
					label: todo,
					done: false
				}
			]);
			updateTodos(newList);
			setTodo("");
		}
	};
	const deleteTodo = index => {
		let newList = list.filter((item, i) => {
			return i !== index;
		});
		updateTodos(newList);
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
								}}
								onMouseOut={() => {
									setDeleteIndex(null);
								}}
								className="list-group-item d-flex justify-content-between  text-center align-items-center "
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
									className={`delete float-right ${
										deleteIndex === index
											? "delete-visible"
											: "delete-none"
									}`}
									onClick={() => deleteTodo(index)}>
									<FontAwesomeIcon icon={faTimes} />
								</span>
							</li>
						);
					})}
					<li className="items">
						<span
							onClick={() =>
								updateTodos([
									{ label: "sample todo", done: false }
								])
							}>
							Clear all
						</span>
						{list.length} item
						{list.length > 1 || list.length === 0 ? "s" : null} left
					</li>
				</ul>
			</form>
		</div>
	);
}
