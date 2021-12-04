using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BloodDonation.Models
{
    public class Hospital
    {
        public int HospitalID { get; set; }
        [Column(TypeName = "NVARCHAR(150)"), Display(Name = "Hospital Name")]
        public string HospitalName { get; set; }
        [Column(TypeName = "NVARCHAR(500)"), Display(Name = "Hospital Address")]
        public string HospitalAddress { get; set; }
        [Column(TypeName = "NVARCHAR(30)"), Display(Name = "Contact No")]
        public string ContactNo { get; set; }
        //navigation
        public virtual ICollection<BloodRequest> BloodRequests { get; set; }
        public virtual ICollection<DonateBlood> DonateBloods { get; set; }
    }
}
