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

	export = () => {
		alert('Export - TODO')
	}

	render() {
		const { json, selectedItems } = this.state

		return (
			<>
				<h1 className="title" style={{ marginBottom: 50 }}>
					Network JSON Analyzer
				</h1>
				{json && <TreeContainer data={json} onTreeChange={this.onTreeChange} />}
				<div>
					<p className="subtitle" style={{ marginTop: 20 }}>
						Selected items ({selectedItems.length}):
					</p>
					{selectedItems.length > 0 ? (
						<>
							<ul style={{ marginTop: 20 }}>
								{selectedItems.map(item => (
									<li key={item._id} style={{ paddingBottom: 10 }}>
										<div>
											<b>{item.label}</b>: {item.value}
										</div>
										<small style={{ color: '#a9a9a9' }}>
											<b>Path:</b> <span>{item.parentsInfo}</span>
										</small>
									</li>
								))}
							</ul>
							<hr />
							<button className="button is-primary" onClick={this.export}>
								Export to CSV
							</button>
						</>
					) : (
						<p>No selected items.</p>
					)}
				</div>
			</>
		)
	}
}
