package test;

import java.security.Provider.Service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	
	@Autowired
	DServices services;
	
	
	@GetMapping("/get")
	public ResponseEntity<?> getData(){
		List<ReturnEntity> listOfData = services.getData();
		return ResponseEntity.ok("all Datas Get");
	}

}
