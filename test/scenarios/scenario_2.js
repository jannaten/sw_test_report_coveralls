import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import filter from '../../src/filter.js';
import reduce from '../../src/reduce.js';
import toNumber from '../../src/toNumber.js';
import get from '../../src/get.js';
import isEmpty from '../../src/isEmpty.js';
import isArrayLike from '../../src/isArrayLike.js';
import isObject from '../../src/isObject.js';

chai.use(sinonChai);
const expect = chai.expect;

describe('E2E Scenario 2: Using shopping cart', () => {
    let addToCart;
    let removeFromCart;
    let updateCartUI;
    let cart;
    let products;

    before(() => {
        addToCart = sinon.stub().returns(true);
        removeFromCart = sinon.stub().returns(true);
        updateCartUI = sinon.stub().returns(true);

        cart = [];
        products = [
            {
                id: 1,
                name: "Organic Apples",
                category: "Fruits",
                price: 4.99,
                quantity: 1
            },
            {
                id: 2,
                name: "Organic Bananas",
                category: "Fruits",
                price: 3.99,
                quantity: 1
            }
        ];
    });

    it('should add apple product to cart', () => {
        const product = products[0];
        addToCart(product);
        cart.push(product);

        expect(addToCart).to.have.been.calledWith(product);
        expect(isArrayLike(cart)).to.be.true;
        expect(cart).to.have.lengthOf(1);
    });

    it('should validate cart item structure', () => {
        cart.forEach(item => {
            expect(isObject(item)).to.be.true;
            expect(isEmpty(get(item, 'name'))).to.be.false;
            expect(toNumber(get(item, 'price'))).to.be.above(0);
        });
    });

    it('should remove product from cart', () => {
        const productId = 1;
        removeFromCart(productId);
        cart = filter(cart, item => get(item, 'id') !== productId);

        expect(removeFromCart).to.have.been.calledWith(productId);
        expect(cart).to.have.lengthOf(0);
    });

    it('should calculate total price', () => {
        const apples = products[0];
        const bananas = products[1];
        cart.push(apples, bananas);

        const total = reduce(cart, (sum, item) => {
            return sum + toNumber(get(item, 'price'));
        }, 0);

        expect(total).to.equal(8.98);
    });
});