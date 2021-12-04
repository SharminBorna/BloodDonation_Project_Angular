using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BloodDonation.Models
{
    public class Location
    {
        public int LocationID { get; set; }
        [Column(TypeName = "NVARCHAR(250)"), Display(Name = "Location Name")]
        public string LocationName { get; set; }
        [Column(TypeName = "NVARCHAR(250)")]
        public string CityName { get; set; }
        //navigation
        public virtual ICollection<Profile> Profiles { get; set; }
        public virtual ICollection<BloodRequest> BloodRequests { get; set; }
        public virtual ICollection<DonateBlood> DonateBloods { get; set; }
    }
}
