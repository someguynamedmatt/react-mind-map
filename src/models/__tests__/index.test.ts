import { Node } from '../node'
import { Map } from '../map'

describe('[models]:', () => {
  describe('Node:', () => {
    describe('instantiates an object with ', () => {
      it('an id', () => {
        expect.assertions(1)
        const node = new Node()
        expect(node.id).not.toBeNull()
      })

      it('a child-array of length 1', () => {
        expect.assertions(1)
        const node = new Node({ children: [new Node()] })

        expect(node.children.length).toEqual(1)
      })

      it('a gettable/settable topic', () => {
        expect.assertions(2)
        const node = new Node({ topic: 'Test' })

        expect(node.topic).toEqual('Test')
        node.topic = 'A different topic'
        expect(node.topic).toEqual('A different topic')
      })
    })

    describe('root-node', () => {
      it("indicates it's a root node", () => {
        expect.assertions(1)
        const node = new Node({ isRoot: true })
        expect(node.isRoot).toEqual(true)
      })

      it('has no parentId', () => {
        expect.assertions(1)
        const node = new Node({ isRoot: true })
        expect(node.parentId).toBeNull()
      })

      it('when set to false and has no parentId, throws a warning', () => {
        expect.assertions(2)
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn())
        const node = new Node({ isRoot: true })

        node.isRoot = false
        expect(node.isRoot).toEqual(false)
        expect(consoleSpy).toHaveBeenCalled()
      })
    })

    describe('children', () => {
      it("have a parentId equal to the parent's id", () => {
        expect.assertions(2)
        const node = new Node({ children: [new Node(), new Node()] })
        expect(node.children[0].parentId).toEqual(node.id)
        expect(node.children[1].parentId).toEqual(node.id)
      })
    })
  })

  describe('Map:', () => {
    describe('instantiates a Map-object with', () => {
      it('a default root node', () => {
        expect.assertions(2)
        const map = new Map()
        expect(map.root).not.toBeFalsy()
        expect(map.nodeCount).toEqual(1)
      })
    })

    describe('nodes', () => {
      it('can be added', () => {
        expect.assertions(3)
        const map = new Map()
        expect(map.root).not.toBeFalsy()
        expect(map.nodeCount).toEqual(1)
        map.addNode(new Node())
        expect(map.nodeCount).toEqual(2)
      })

      it('can be removed', () => {
        expect.assertions(2)
        const map = new Map()
        const newNode = new Node()
        map.addNode(newNode)
        expect(map.nodeCount).toEqual(2)
        map.removeNode(newNode)
        expect(map.nodeCount).toEqual(1)
      })

      it('can be cleared', () => {
        expect.assertions(2)
        const map = new Map()
        const newNode = new Node()
        const newNode2 = new Node()
        map.addNode(newNode)
        map.addNode(newNode2)
        expect(map.nodeCount).toEqual(3)
        map.clear()
        expect(map.nodeCount).toEqual(0)
      })
    })
  })
})
