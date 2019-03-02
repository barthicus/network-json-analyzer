import React, { Component } from 'react'
import TreeContainer from './components/TreeContainer'

import './app.css'

export default class App extends Component {
	state = { json: null, selectedItems: [] }

	componentDidMount() {
		fetch('/api/getTestJson')
			.then(res => res.json())
			.then(data => this.setState({ json: data }))
	}

	onTreeChange = nodesWithParentsInfo => {
		console.log('currentNode, selectedNodes', nodesWithParentsInfo)
		this.setState({ selectedItems: nodesWithParentsInfo })
	}

	render() {
		const { json, selectedItems } = this.state

		return (
			<>
				<h1 className="title">Network JSON Analyzer</h1>
				{json && <TreeContainer data={json} onTreeChange={this.onTreeChange} />}
				<div>
					<p className="subtitle">Selected items ({selectedItems.length}):</p>
					{selectedItems.length > 0 ? (
						<ul>
							{selectedItems.map(item => (
								<li key={item._id}>
									<div>
										<b>{item.parentsInfo}</b>
									</div>
									<div>
										{item.label}: {item.value}
									</div>
								</li>
							))}
						</ul>
					) : (
						'No selected items.'
					)}
				</div>
			</>
		)
	}
}
