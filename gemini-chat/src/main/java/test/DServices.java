package test;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DServices {
	
	@Autowired
	DepartmenRepo departmenRepo;
	
	@Autowired
	ReturnEntity returnEntity;
	
	
	public String addData(Department department) {
		
		departmenRepo.save(department);
		return "Data is Added";
		
	}
	
	public List<ReturnEntity> getData(){
		
		List<Department> listOf = departmenRepo.findAll();
		List<ReturnEntity> rData;
		
		
		for(Department dData : listOf) {
			
			

			int id = dData.getEmployees().getId();
			String name = dData.getEmployees().getName();
			int finalSalary = dData.getBonus() + dData.getEmployees().getBaseSalary() + dData.getEmployees().getBounus();
			
			ReturnEntity newData = new ReturnEntity(id, name, finalSalary);
			
			rData.add(newData);
			
			
			
		}
		
		return rData;
	}

}
