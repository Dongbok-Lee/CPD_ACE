package com.cpd.ace.repository;

import com.cpd.ace.model.Medicine;
import com.cpd.ace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
    Medicine findById(int medicineId);
}
