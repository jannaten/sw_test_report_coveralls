import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import capitalize from '../../src/capitalize.js';
import isObject from '../../src/isObject.js';
import isEmpty from '../../src/isEmpty.js';
import get from '../../src/get.js';
import words from '../../src/words.js';

chai.use(sinonChai);
const expect = chai.expect;

describe('E2E Scenario 3: Small Producer Adding a New Product', () => {
    let submitProduct;
    let validateProduct;
    let formatProduct;
    let product;

    before(() => {
        submitProduct = sinon.stub().returns(true);
        validateProduct = sinon.stub().returns(true);
        formatProduct = sinon.stub();

        product = {
            name: "organic heirloom tomatoes",
            category: "vegetables",
            price: 3.99,
            contents: "100% organic heirloom tomatoes",
            description: "juicy, flavorful organic heirloom tomatoes",
            producer: ""
        };

        formatProduct.returns({
            ...product,
            name: capitalize(product.name),
            category: capitalize(product.category),
            description: words(product.description)
                .map(word => capitalize(word))
                .join(' ')
        });
    });

    it('should validate product data structure', () => {
        expect(isObject(product)).to.be.true;
        validateProduct(product);
        expect(validateProduct).to.have.been.called;
    });

    it('should format product fields correctly', () => {
        const formattedProduct = formatProduct(product);
        expect(formatProduct).to.have.been.calledWith(product);
        expect(get(formattedProduct, 'name')).to.equal('Organic heirloom tomatoes');
        expect(get(formattedProduct, 'category')).to.equal('Vegetables');
    });

    it('should handle product contents', () => {
        const contents = words(get(product, 'contents'));
        expect(contents).to.include('organic');
        expect(isEmpty(product.contents)).to.be.false;
    });

    it('should successfully submit product', () => {
        const formattedProduct = formatProduct(product);
        const result = submitProduct(formattedProduct);
        
        expect(result).to.be.true;
        expect(submitProduct).to.have.been.calledWith(formattedProduct);
    });
});