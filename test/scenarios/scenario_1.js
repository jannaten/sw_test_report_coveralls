import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import filter from '../../src/filter.js';
import toString from '../../src/toString.js';
import capitalize from '../../src/capitalize.js';
import isEmpty from '../../src/isEmpty.js';
import get from '../../src/get.js';
import isArrayLike from '../../src/isArrayLike.js';
import words from '../../src/words.js';
import reduce from '../../src/reduce.js';
import toNumber from '../../src/toNumber.js';
import isObject from '../../src/isObject.js';

chai.use(sinonChai);
const expect = chai.expect;

describe('E2E Scenario 1: Searching for food products', () => {
    let searchProducts;
    let displayResults;
    let products;
    let searchResults;

    before(() => {
        searchProducts = sinon.stub().returns(true);
        displayResults = sinon.stub().returns(true);

        products = [
            {
                id: 1,
                name: "Organic Apples",
                category: "Fruits",
                price: 4.99,
                contents: "100% Organic Apples",
                producer: "Green Farms"
            },
            {
                id: 2,
                name: "Fresh Bananas",
                category: "Fruits",
                price: 3.99,
                contents: "Fresh Bananas",
                producer: "Tropical Foods"
            },
            {
                id: 3,
                name: "Apple Juice",
                category: "Beverages",
                price: 2.99,
                contents: "Pure Apple Juice",
                producer: "Nature's Best"
            }
        ];

        searchResults = [];
    });

    it('should handle search input "Organic app"', () => {
        const searchTerm = "Organic app";
        searchResults = filter(products, product => {
            const productName = toString(get(product, 'name')).toLowerCase();
            return productName.includes(searchTerm.toLowerCase());
        });

        searchProducts(searchTerm);
        expect(searchProducts).to.have.been.calledWith(searchTerm);
        expect(isArrayLike(searchResults)).to.be.true;
    });

    it('should format search results correctly', () => {
        const formattedResults = searchResults.map(product => ({
            ...product,
            name: capitalize(get(product, 'name')),
            category: capitalize(get(product, 'category'))
        }));

        displayResults(formattedResults);
        expect(displayResults).to.have.been.called;
        formattedResults.forEach(product => {
            expect(isObject(product)).to.be.true;
            expect(get(product, 'name')).to.match(/^[A-Z]/);
        });
    });

    it('should verify product contents', () => {
        searchResults.forEach(product => {
            expect(isEmpty(get(product, 'contents'))).to.be.false;
            const description = words(get(product, 'contents'));
            expect(description.length).to.be.greaterThan(0);
        });
    });

    it('should calculate product price total', () => {
        const total = reduce(searchResults, (sum, product) => {
            return sum + toNumber(get(product, 'price'));
        }, 0);
        expect(total).to.be.a('number');
    });
});