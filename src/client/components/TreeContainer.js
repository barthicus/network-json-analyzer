import React, { Component } from 'react'
import propTypes from 'proptypes'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import isEqual from 'lodash/isEqual'
import 'react-dropdown-tree-select/dist/styles.css'

class TreeContainer extends Component {
	static propTypes = {
		data: propTypes.object.isRequired,
		onTreeChange: propTypes.func
	}

	constructor(props) {
		super(props)
		this.state = {
			json: props.data,
			treeData: this.prepareDataForTree(props.data),
			hashMap: this.getHashMap(props.data.content)
		}
	}

	static getDerivedStateFromProps = (nextProps, state) => {
		if (!isEqual(nextProps.data, state.data)) {
			return { data: nextProps.data }
		}
		return false
	}

	shouldComponentUpdate = nextProps => {
		return !isEqual(nextProps.data, this.state.data)
	}

	getRecursiveChildren = data => {
		const children = []
		Object.entries(data).forEach(([key, item]) => {
			const newChild = { label: key, value: 0 }
			if (item && typeof item === 'object') {
				newChild.children = this.getRecursiveChildren(item)
				newChild.disabled = true
			} else {
				// const newLabel = item.length < 30 && item 
				// 	? `${key} (value: ${item})` 
				// 	: (item && item.length 
				// 		? `${key} (value: ${item.substr(0, 25)}...)` 
				// 		: key)
				// newChild.label = newLabel
				newChild.value = item
				newChild.disabled = false
			}
			children.push(newChild)
		})
		return children
	}

	getHashMap(entries) {
		const initialKey = 0
		const hashMap = new Map()
		hashMap.set('0', 'filename.json')

		const traverse = (data, hashMap, prevKey) => {
			let entryIndex = 0
			Object.entries(data).forEach(([key, item]) => {
				let newKey = prevKey + '-' + entryIndex

				entryIndex++

				hashMap.set(newKey, key)
				if (item && typeof item === 'object') {
					traverse(item, hashMap, newKey)
				}
			})
		}
		traverse(entries, hashMap, initialKey)

		return hashMap
	}

	getItemByPath = path => {
		return this.state.hashMap.get(path) || 'default'
	}

	getParentsInfo = path => {
		if (!path) return

		const parents = path.split('-')

		const labels = parents.reduce((prev, current, index, array) => {
			const parent = array.slice(0, array.length - index)
			const parentPath = parent.length ? parent.join('-') : current
			prev.push(this.getItemByPath(parentPath))
			return prev
		}, [])

		return labels.reverse().join(' > ')
	}

	onChange = (currentNode, selectedNodes) => {
		const nodesWithParentsInfo = selectedNodes.map(node => ({
			...node,
			parentsInfo: this.getParentsInfo(node._parent)
		}))
		this.props.onTreeChange(nodesWithParentsInfo)
	}

	prepareDataForTree = data => {
		return {
			label: data ? data.filename : 'loading file',
			value: 0,
			disabled: true,
			children: data && this.getRecursiveChildren(data.content)
		}
	}

	render() {
		const { data, ...rest } = this.props
		return <DropdownTreeSelect data={this.state.treeData} onChange={this.onChange} {...rest} />
	}
}

export default TreeContainer
