package org.redhat.mongodb;

import javax.inject.Inject;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/companies")
public class CompanyResource {

    @Inject CompanyService companyService;

    @GET
    public List<CompanyInfo> list() {
        return companyService.list();
    }

    @POST
    public List<CompanyInfo> add(CompanyInfo companyInfo) {
        companyService.add(companyInfo);
        return list();
    }
}