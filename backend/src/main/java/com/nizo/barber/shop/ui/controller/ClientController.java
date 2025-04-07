package com.nizo.barber.shop.ui.controller;

import com.nizo.barber.shop.ui.controller.request.SaveClientRequest;
import com.nizo.barber.shop.ui.controller.request.UpdateClientRequest;
import com.nizo.barber.shop.ui.controller.response.ClientDetailsResponse;
import com.nizo.barber.shop.ui.controller.response.ListClientResponse;
import com.nizo.barber.shop.ui.controller.response.SaveClientResponse;
import com.nizo.barber.shop.ui.controller.response.UpdateClientResponse;
import com.nizo.barber.shop.ui.mapper.ClientMapperInterface;
import com.nizo.barber.shop.ui.service.ClientService;
import com.nizo.barber.shop.ui.service.query.ClientQueryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@AllArgsConstructor
public class ClientController{
    private final ClientQueryService clientQueryService;
    private final ClientService clientService;
    private final ClientMapperInterface mapper;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SaveClientResponse save(@RequestBody @Valid SaveClientRequest request){
        var entity = mapper.toEntity(request);
        clientService.save(entity);
        return mapper.toSaveResponse(entity);
    }
    @PutMapping("/{clientId}")
    public UpdateClientResponse update(@RequestBody @Valid UpdateClientRequest request, @PathVariable String clientId){
        var entity = mapper.toEntity(clientId, request);
        clientService.update(entity);
        return mapper.toUpdateResponse(entity);
    }

    @DeleteMapping("/{clientId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String clientId){
        clientService.delete(clientId);
    }
    @GetMapping("/{clientId}")
    ClientDetailsResponse findById(@PathVariable String clientId){
        var entity = clientQueryService.findById(clientId);
        return mapper.toDetailsResponse(entity);
    }
    @GetMapping
    List<ListClientResponse> findAll(){
        var entities = clientQueryService.findAll();
        return mapper.toListResponse(entities);
    }
}
