package com.cpd.ace.controller;

import com.cpd.ace.model.Medicine;
import com.cpd.ace.model.User;
import com.cpd.ace.service.MedicineService;
import com.cpd.ace.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@Service
public class MedicineController {

    private final MedicineService medicineService;

    @Autowired
    public MedicineController(MedicineService medicineService){
        this.medicineService = medicineService;
    }

    @GetMapping("/medicine")
    public Medicine getInfo(@RequestParam(value = "medicineId") int medicineId){
        return medicineService.getInfo(medicineId);
    }


    @PostMapping("/medicine/create")
    public String signup(@RequestBody Medicine medicine) {
        medicineService.signup(medicine);
        return "회원가입 완료";
    }

    @PutMapping("/medicine/update")
    public String update(@RequestBody Medicine medicine) {
        medicineService.update(medicine);
        return "수정 완료";
    }
}
