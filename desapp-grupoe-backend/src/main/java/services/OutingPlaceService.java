package services;

import exceptions.EntityValidationException;
import model.builders.outings.OutingPlaceBuilder;
import model.builders.time.WeekTimeScheduleBuilder;
import model.locations.Address;
import model.locations.Coord;
import model.outings.OutingPlace;
import org.springframework.transaction.annotation.Transactional;
import persistence.AddressDAO;
import persistence.OutingPlaceDAO;
import persistence.TagDAO;
import persistence.WeekTimeScheduleDAO;
import persistence.strategies.OutingFilter;
import services.initialization.Initializable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

public class OutingPlaceService extends GenericService<OutingPlace> implements Initializable {

    private AddressDAO addressDAO;
    private TagDAO tagDAO;

    public TagDAO getTagDAO() {
        return tagDAO;
    }

    public void setTagDAO(TagDAO tagDAO) {
        this.tagDAO = tagDAO;
    }

    public AddressDAO getAddressDAO() {
        return addressDAO;
    }

    public void setAddressDAO(AddressDAO addressDAO) {
        this.addressDAO = addressDAO;
    }



    @Transactional
    public void initialize() throws EntityValidationException {

        OutingPlace cuartetas = OutingPlaceBuilder.anOutingPlace()
                .withName("Las Cuartetas")
                .withDescription("Una de las pizzerias mas populares de Buenos Aires")
                .withPrice(200)
                .withWeekTimeSchedule(WeekTimeScheduleBuilder.anyWeekTimeSchedule().build())
                .withImage("/images/cuartetas.jpg")
                .withAddress(new Address(new Coord(-34.60375, -58.3785746), "Buenos Aires"))
                .withTag(tagDAO.findById(24))
                .withTag(tagDAO.findById(23))
                .withTag(tagDAO.findById(12))
                .withMaxAssistants(200)
                .build();

        OutingPlace tgiFridays = OutingPlaceBuilder.anOutingPlace()
                .withName("TGI Fridays")
                .withDescription("Restaurant popular de Puerto Madero")
                .withPrice(600)
                .withWeekTimeSchedule(WeekTimeScheduleBuilder.anyWeekTimeSchedule().build())
                .withImage("/images/tgi.jpg")
                .withAddress(new Address(new Coord(-34.6095008, -58.3662253), "Buenos Aires"))
                .withTag(tagDAO.findById(24))
                .withTag(tagDAO.findById(23))
                .withMaxAssistants(200)
                .build();

        OutingPlace mcdonalds = OutingPlaceBuilder.anOutingPlace()
                .withName("Mc Donalds")
                .withDescription("Me encanta!")
                .withPrice(150)
                .withWeekTimeSchedule(WeekTimeScheduleBuilder.anyWeekTimeSchedule().build())
                .withImage("/images/mc.jpg")
                .withAddress(new Address(new Coord(-34.6038946, -58.3807468), "Microcentro"))
                .withTag(tagDAO.findById(23))
                .withMaxAssistants(200)
                .build();
        OutingPlace sigalavaca = OutingPlaceBuilder.anOutingPlace()
                .withName("Siga la vaca")
                .withDescription("La historia de Siga La Vaca se remonta a 1993, cuando un grupo de emprendedores vinculados a la industria de la carne apostó al proyecto que, en poco más de una década, cambiaría para siempre la gastronomía argentina.")
                .withPrice(100)
                .withWeekTimeSchedule(WeekTimeScheduleBuilder.anyWeekTimeSchedule().build())
                .withImage("/images/vaca.jpg")
                .withAddress(new Address(new Coord(-34.61863, -58.3651501), "Puerto Madero"))
                .withTag(tagDAO.findById(23))
                .withMaxAssistants(200)
                .build();
        OutingPlace cinemark = OutingPlaceBuilder.anOutingPlace()
                .withName("Cinemark")
                .withDescription("Cines de Argentina")
                .withPrice(85)
                .withWeekTimeSchedule(WeekTimeScheduleBuilder.anyWeekTimeSchedule().build())
                .withImage("/images/cine.png")
                .withAddress(new Address(new Coord(-34.5864633, -58.410349), "Recoleta"))
                .withTag(tagDAO.findById(22))
                .withMaxAssistants(100)
                .build();
        OutingPlace colon = OutingPlaceBuilder.anOutingPlace()
                .withName("Teatro Colon")
                .withDescription("El teatro mas emblematico de la Argentina")
                .withPrice(150)
                .withWeekTimeSchedule(WeekTimeScheduleBuilder.anyWeekTimeSchedule().build())
                .withImage("/images/colon.jpg")
                .withAddress(new Address(new Coord(-34.6010406, -58.3830786), "Microcentro"))
                .withTag(tagDAO.findById(23))
                .withTag(tagDAO.findById(22))
                .withMaxAssistants(1000)
                .build();
        OutingPlace planetario = OutingPlaceBuilder.anOutingPlace()
                .withName("Planetario")
                .withDescription("Su cúpula tiene 20 m de diámetro. Sobre ella pueden llegar a reproducirse 8900 estrellas fijas, constelaciones y nebulosas.")
                .withPrice(150)
                .withWeekTimeSchedule(WeekTimeScheduleBuilder.anyWeekTimeSchedule().build())
                .withImage("/images/planetario.jpg")
                .withAddress(new Address(new Coord(-34.569722, -58.411667), "Palermo"))
                .withTag(tagDAO.findById(23))
                .withTag(tagDAO.findById(22))
                .withMaxAssistants(200)
                .build();
        OutingPlace granRex = OutingPlaceBuilder.anOutingPlace()
                .withName("Gran Rex")
                .withDescription("Es el teatro de los grandes espectáculos musicales y recibe a los artistas más consagrados, nacional e internacionalmente. Su capacidad es para 3.262 espectadores.")
                .withPrice(150)
                .withWeekTimeSchedule(WeekTimeScheduleBuilder.anyWeekTimeSchedule().build())
                .withImage("/images/rex.jpg")
                .withAddress(new Address(new Coord(-34.6033, -58.3789), "CABA"))
                .withTag(tagDAO.findById(22))
                .withMaxAssistants(500)
                .build();
        save(cuartetas);
        save(tgiFridays);
        save(mcdonalds);
        save(sigalavaca);
        save(cinemark);
        save(colon);
        save(planetario);
        save(granRex);
    }

    @Override
    @Transactional
    public void save(OutingPlace place) {
        validate(place);
        OutingPlace newOutingPlace = OutingPlaceBuilder.anOutingPlace().build();
        super.save(newOutingPlace);
        place.setId(newOutingPlace.getId());
        addressDAO.save(place.getAddress());
        super.update(place);
    }

    @Override
    @Transactional
    public void update(OutingPlace place) {
        validate(place);
        super.update(place);
    }

    @Transactional
    public List<OutingPlace> searchPlaces(OutingFilter filter) {
        OutingPlaceDAO repo = (OutingPlaceDAO) getRepository();
        return repo.findPlaces(filter);
    }

    private void validate(OutingPlace outing) {
        if (outing.getName().length()>50) {
            throw new EntityValidationException("name_too_long");
        }
        if (outing.getDescription().length()>500) {
            throw new EntityValidationException("description_too_long");
        }
        if (outing.getPrice()<0 && outing.getPrice()>500000) {
            throw new EntityValidationException("invalid_price");
        }

        if (outing.getMaxAssistants()>1000000000) {
            throw new EntityValidationException("invalid_max_assistants");
        }
    }
}