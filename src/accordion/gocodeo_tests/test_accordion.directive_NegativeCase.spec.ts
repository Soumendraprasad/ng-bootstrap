//@ts-nocheck
it('should throw an error if required dependencies are missing', () => {
	expect(() => {
		TestBed.configureTestingModule({
			imports: [],
			declarations: [NgbAccordionBody],
			providers: [],
		}).compileComponents();
	}).toThrowError('NgbAccordionBody: missing essential dependency ViewContainerRef');
});
