package test;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Department {
	
	@Id
	int id;
	String name;
	int bonus;
	
	@OneToMany
	Employees employees;

}
