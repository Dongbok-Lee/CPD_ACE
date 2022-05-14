package com.cpd.ace.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    private int productId;

    @Column(length = 50)
    private String pharmacy;

    @Column(nullable = false, length = 30)
    private String userName;

    @Column(nullable = false)
    private Enum.Sex sex;

    @Column(nullable = false)
    private int age;

    @Column(length = 50)
    private String hospital;
}
