using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BloodDonation.Models
{
    public class BloodGroup
    {
        public int BloodGroupID { get; set; }
        [Required, Column(TypeName = "NVARCHAR(20)"), Display(Name = "Group Name")]
        public string GroupName { get; set; }
        //navigation
        public virtual ICollection<Profile> Profiles { get; set; }
        public virtual ICollection<BloodRequest> BloodRequests { get; set; }
        public virtual ICollection<BloodStock> BloodStocks { get; set; }
    }
}
