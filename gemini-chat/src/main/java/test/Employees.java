package test;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;


@Data
@Entity
public class Employees {
	
	@Id
	int id;
	String name;
	int baseSalary;
	int bounus;
	String department;
	
	

}
