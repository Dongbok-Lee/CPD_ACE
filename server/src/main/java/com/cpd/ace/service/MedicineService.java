package com.cpd.ace.service;

import com.cpd.ace.model.Medicine;
import com.cpd.ace.model.User;
import com.cpd.ace.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    @Autowired
    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }
    public Medicine getInfo(int medicineId){
        return medicineRepository.findById(medicineId);
    }
    public void signup(Medicine medicine) {
        medicineRepository.save(medicine);
    }
    public void update(Medicine medicine){
        medicineRepository.save(medicine);
    }
}
