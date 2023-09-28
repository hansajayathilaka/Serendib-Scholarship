import { TestBed } from '@angular/core/testing';

import { GeneralFirebaseService } from './general-firebase.service';

describe('GeneralFirebaseService', () => {
    let service: GeneralFirebaseService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GeneralFirebaseService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
