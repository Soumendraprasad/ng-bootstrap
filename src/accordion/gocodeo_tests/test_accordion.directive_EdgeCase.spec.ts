//@ts-nocheck
// Setup
const accordionBody = new NgbAccordionBody();
accordionBody['_vcr'] = {
	createEmbeddedView: jest.fn().mockReturnValue({
		rootNodes: [],
		detectChanges: jest.fn(),
	}),
	remove: jest.fn(),
};
accordionBody['_element'] = document.createElement('div');
accordionBody['_item'] = { _shouldBeInDOM: true };
accordionBody['_bodyTpl'] = new TemplateRef<any>(null!, null!);

// Act
accordionBody.ngAfterContentChecked();

// Assert
expect(accordionBody['_vcr'].createEmbeddedView).toHaveBeenCalledWith(accordionBody['_bodyTpl']);
expect(accordionBody['_element'].appendChild).toHaveBeenCalled();
