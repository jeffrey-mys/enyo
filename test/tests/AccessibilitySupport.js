var
	kind = require('../../lib/kind');

var
	AccessibilitySupport = require('../../lib/AccessibilitySupport')
	Control = require('../../lib/Control');

describe('AccessibilitySupport', function () {

	describe('usage', function () {

		describe('#updateAriaAttributes', function () {

			var TestControl, testControl, content, label, hint;

			before(function () {
				content = 'content';
				label = 'label';
				hint = 'hint';

				TestControl = kind({
					kind: Control,
					mixins: [AccessibilitySupport]
				});

				testControl = new TestControl();
			});

			after(function () {
				testControl.destroy();
				TestControl = null;
			});

			it ('should equal content', function () {

				testControl.set('content', content);
				testControl.set('accessibilityLabel', '');
				testControl.set('accessibilityHint', '');

				expect(testControl.getAttribute('aria-label')).to.equal(content);
			});

			it ('should equal accessibilityLabel without content', function () {

				testControl.set('content', '');
				testControl.set('accessibilityLabel', label);
				testControl.set('accessibilityHint', '');

				expect(testControl.getAttribute('aria-label')).to.equal(label);
			});

			it ('should equal accessibilityLabel with content', function () {

				testControl.set('content', content);
				testControl.set('accessibilityLabel', label);
				testControl.set('accessibilityHint', '');

				expect(testControl.getAttribute('aria-label')).to.equal(label);
			});

			it ('should equal accessibilityHint', function () {

				testControl.set('content', '');
				testControl.set('accessibilityLabel', '');
				testControl.set('accessibilityHint', hint);

				expect(testControl.getAttribute('aria-label')).to.equal(hint);
			});

			it ('should equal content + accessibilityHint', function () {

				testControl.set('content', content);
				testControl.set('accessibilityLabel', '');
				testControl.set('accessibilityHint', hint);

				expect(testControl.getAttribute('aria-label')).to.equal(content + ' ' + hint);
			});

			it ('should equal accessibilityLabel + accessibilityHint without content', function () {

				testControl.set('content', '');
				testControl.set('accessibilityLabel', label);
				testControl.set('accessibilityHint', hint);

				expect(testControl.getAttribute('aria-label')).to.equal(label + ' ' + hint);
			});

			it ('should equal accessibilityLabel + accessibilityHint with content', function () {

				testControl.set('content', content);
				testControl.set('accessibilityLabel', label);
				testControl.set('accessibilityHint', hint);

				expect(testControl.getAttribute('aria-label')).to.equal(label + ' ' + hint);
			});

		});

	});

});