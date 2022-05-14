package com.cpd.ace.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Medicine {
    @Id
    @GeneratedValue
    public int Id;

    @ManyToOne
    @JoinColumn(name = "productId")
    private User user;

    @Column(length = 10)
    private String time;
}
